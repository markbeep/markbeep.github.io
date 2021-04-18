const WEBRING_DARK_DATA_URL = "https://xyquadrat.ch/polyring/data/members.json"

class WebringBannerDark extends HTMLElement {
    constructor() {
        super();

        this.ringtitle = 'Polyring';
        this.url = 'https://xyquadrat.ch/polyring';
        this.image = this.url + '/assets/images/polyring_icon.min.svg';
        this.membercount = 9;
        this.shadowObj = this.attachShadow({ mode: 'open' });
        
        fetch(WEBRING_DARK_DATA_URL)
          .then(response => response.json())
          .then(sites => {
            const siteIndex = sites.findIndex(
              (site) => site.url.includes(window.location.hostname)
            );

            this.previousUrl = siteIndex < 1 ? sites[sites.length - 1].url : sites[siteIndex - 1].url;
            this.nextUrl = siteIndex >= sites.length - 1 ? sites[0].url : sites[siteIndex + 1].url;
            
            this.render();
          });
    }

    getStyles() {
        return `
        <style>
          * {
            box-sizing: border-box;
          }
        
          :root {
            font-size: 100%;
          }

          :host {
            display: block;
            width: 100%;
            font-size: 16px;
            text-align: left;
          }
  
          .webring-banner-dark {
            background-color: #000;
            border: 1px solid #222;
            border-radius: 8px;
            box-shadow: 0 2px 4px 0 rgba(14, 30, 37, 0.12);
            max-width: 480px;
          }

          .webring-banner-dark a {
            color: #9f56ff;
            text-decoration: none;
          }

          .webring-banner-dark a:hover,
          .webring-banner-dark a:focus {
            text-decoration: underline;
          }

          .webring-banner-dark__header {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            position: relative;
            padding: 1rem;
            border-bottom: 1px solid #DDD;
          }

          .webring-banner-dark__description {
            flex: 1 0 0%;
            padding-right: 2rem;
            color: #ddd;
          }

          .webring-banner-dark__image {
            display: block;
            width: 70px;
            height: 70px;
            margin-right: 1rem;
            border-radius: 50%;
            filter: invert();
          }

          .webring-banner-dark__title {
            margin: 0;
            font-size: 1.5rem;
            font-weight: bold;
            line-height: 1.2;
          }

          .webring-banner-dark__info {
            display: flex;
            justify-content: center;
            border-radius: 50%;
            border: 2px solid #DDD;
            width: 1.25rem;
            height: 1.25rem;
            line-height: 1.25rem;
            font-size: .75rem;
            text-align: center;
            color: #666;
            text-decoration: none;
            position: absolute;
            top: 1rem;
            right: 1rem;
          }

          .webring-banner-dark__links {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 1rem;
            margin: 0;
          }

          .webring-banner-dark__link {
            display: block;
            text-decoration: none;
            color: #00ad9f;
          }

          .webring-banner-dark__link--next {
            text-align: right;
          }

          @media (min-width:400px) {
            .webring-banner-dark__link {
                min-width: 100px;
            }
            .webring-banner-dark__info {
                align-items: center;
            }
          }
        </style>
      `;
    }

    getTemplate() {
        return `
          ${this.getStyles()}
          <div class="webring-banner-dark">
            <div class="webring-banner-dark__header">
              <img class="webring-banner-dark__image" src="${this.image}" alt="" />
              <div class="webring-banner-dark__description">
                <span>This site is part of</span>
                <h3 class="webring-banner-dark__title">
                  <a href="${this.url}">${this.ringtitle}</a>
                </h3>
                <span>A webring with ${this.membercount} members</span>
              </div>
              <a class="webring-banner-dark__info" href="https://en.wikipedia.org/wiki/Webring" title="What's this?">?</a>
            </div>
            <p class="webring-banner-dark__links">
              <a 
                href="${this.previousUrl}" 
                class="webring-banner-dark__link webring-banner-dark__link--prev" 
                aria-label="Go to previous site"
              >Previous</a>
              <a
                href="${this.nextUrl}"
                class="webring-banner-dark__link webring-banner-dark__link--next"
                aria-label="Go to next site"
              >Next</a>
            </p>
          </div>
        `;
    }

    render() {
        this.shadowObj.innerHTML = this.getTemplate();
    }
}

customElements.define('webring-banner-dark', WebringBannerDark);