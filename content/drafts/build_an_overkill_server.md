---
title: "Building an Overkill Home Server"
date: 2023-01-07T07:07:21+01:00
showDate: true
draft: true
mathjax: true
justify: true
tags: ["devops", "kubernetes", "docker", "server"]
---

For future side projects and to learn Kubernetes more interactively I decided
to build myself my own server for at home. I've been thinking about it a lot
and then last summer I finally scrambled together all the components to build it.

Because I don't only want the server to be able to host websites or Discord bots,
but also GameServers I opted for a more powerful build.

# Kubernetes, what and why?
My whole plan for this server was to use it for hosting different applications
and websites. This includes my Discord bots
([Lecturfier](https://github.com/markbeep/lecturfier), [Cup](https://github.com/markbeep/cup),
etc.) but also websites I like to hack at on the side. For example my still WIP
[Wenjim](https://wenjim.markc.su/) website to check when the best time to go to ASVZ
is. In the future I also have it planned to move this blog to my home server so I
can make it dynamic.

For this setup I gave myself three options of how I could setup the whole server:
1. Install everything as normal and get into a package and dependency hell.
2. Use Docker for every application and run it all with Docker Compose. This would
be really simple but require me to Dockerize a few applications that aren't yet.
3. Do 2. and setup a single node Kubernetes cluster.

You can already tell, of course I went with the Kubernetes cluster. To explain
Kubernetes very briefly. It is a server tool to orchestrate applications across
multiple nodes (servers). So instead of having to install an application on multiple
machines and handling the load balancer somewhere manually, you can simply setup
Kubernetes on all your nodes and then the distribution will be handled automatically
with an easy way to add a load balancer. One of your nodes goes down or is overused?
No worries, Kubernetes will move your applications to a different working node. 

So all this talk about multiple nodes, but I'm running it on a single node. Why?
Another upside of Kubernetes is that you simply feed it a Dockerfile of your
app and a YAML file describing what it should do and it handles the rest. If you know
docker-compose, it's basically that but on steroids. This allows me to have a very
organized way to handle all my different apps and Kubernetes always makes sure they
stay running if they ever crash or I restart my server.

Another motiviation reason for choosing Kubernetes is that the
[VIS](https://vis.ethz.ch/en/) backend is also all a big Kubernetes cluster.
So to learn how it all works I thought it would be best to also use it on my
own server.

My task for all my applications was now to Dockerize them and make them able to be
run on Kubernetes. Luckily dockerizing apps is quite simply and should be often done,
especially when using Python.

# Building Docker Images Automatically
Now Kubernetes is a nice tool to orchestrate it all, but how do I add my
nice Docker images to it all? One way would be to do some hacky local shenanigans
to upload images to my server and have Kubernetes use them. This is a pretty annoying
workflow though. I'd have to constantly connect to my Kubernetes cluster to upload
the images and run them there. This is also not scalable to multiple nodes, because
I'd have to make sure every node has access to the local Docker image.

Because of this hassle I decided to simply host all my images on
[Docker Hub](https://hub.docker.com/). A free way to store all your Docker images
and then easily download them on any node of your cluster. Now all my Github
repositories I want to be built to Docker Hub I simply have a Github Action
([example](https://github.com/markbeep/Wenjim/blob/master/.github/workflows/docker-prod.yaml))
that then automatically builds my Dockerfiles into images and uploads them to
Docker Hub. So after every push I'll now have the most up to date image available
on any node (and you do as well).

So thats cool, but I still have to manually access my server to create the
Kubernetes config and restart the applications? No, that's wheer ArgoCD comes
into play.

# ArgoCD
ArgoCD is a way to store all your deployment configs inside a Git repository
and it makes sure that the Kubernetes setup matches exactly what is on Git.
This is perfect. It allows me to store how applications should be started and what peristent volumes and ingresses should exist without even having to access the
server. I open my Kubernetes repo, throw in another file for my new deployment,
push and then the deployment automatically is started up.

Another bonus of storing deployments in this way is that in case my server ever
decides to give up on life I can get my deployments up in the same way again.
Luckily this hasn't happened yet.

One exception to my no-server-touch approach is that for secrets I still manually
create them on my server. All the solutions I've seen till now either have you
encrypt secrets on the server or using `kubectl`, which for me is the same as just
clapping the secret on my server directly, or they use some external secrets
managing website. Secrets don't change often though so the manual
approach works for me.

Another added benefit of ArgoCD is that I'm able to get a glimpse of all my
deployments and their state in a webview.

# Did I hear automation?
(website github actions)

# Going further
Recently I was shown [Portainer](https://www.portainer.io/) and it looked
really sick! For the future that is for sure something I'll have to also setup
on my server. Allows for even more handling over a dashboard.

Additionally I have [Grafana](https://grafana.com/) currently on my server, but
haven't gotten to properly setting it all up so it's not realyl tracking anything.
That is also something I have planned to setup sometime in the future :)
