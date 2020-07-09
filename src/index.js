import './index.css';
import GithubLogo from './assets/github-logo.png';


export default class Gist {
  constructor({ data }) {
    this.data = data

    /**
     * container for the entire block
     */
    this.wrapper = undefined
  }

  static get toolbox() {
    return {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 226 226" style=" fill:#000000;"><g fill="none" fill-rule="none" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,226v-226h226v226z" fill="none" fill-rule="nonzero"></path><g fill="#707684" fill-rule="evenodd"><path d="M113,28.25c-46.81665,0 -84.75,37.93335 -84.75,84.75c0,37.43677 24.27734,69.21802 57.96216,80.4187c4.24854,0.77246 5.79346,-1.8208 5.79346,-4.08301c0,-2.01391 -0.08277,-7.33838 -0.11035,-14.40088c-23.58765,5.10377 -28.55347,-11.36621 -28.55347,-11.36621c-3.8623,-9.7937 -9.40747,-12.41455 -9.40747,-12.41455c-7.69702,-5.2417 0.57934,-5.13135 0.57934,-5.13135c8.49707,0.60694 12.96631,8.71777 12.96631,8.71777c7.55908,12.96631 19.83569,9.21436 24.66357,7.0625c0.77246,-5.48998 2.97949,-9.21435 5.37964,-11.33862c-18.81494,-2.12427 -38.59546,-9.40748 -38.59546,-41.87842c0,-9.26953 3.31055,-16.82861 8.71777,-22.76001c-0.85523,-2.12427 -3.77954,-10.75928 0.82764,-22.42895c0,0 7.11767,-2.26221 23.31177,8.69018c6.75903,-1.87598 14.01465,-2.81396 21.21509,-2.84155c7.20044,0.02759 14.45605,0.96557 21.21509,2.84155c16.19409,-10.95239 23.28418,-8.69018 23.28418,-8.69018c4.63477,11.66967 1.73804,20.30469 0.85523,22.42895c5.43481,5.9314 8.69019,13.49048 8.69019,22.76001c0,32.55371 -19.80811,39.69898 -38.67823,41.82324c3.03467,2.59327 5.73828,7.77979 5.73828,15.66992c0,11.33862 -0.08276,20.47022 -0.08276,23.25659c0,2.2622 1.51733,4.91064 5.82104,4.08301c33.65723,-11.22827 57.90698,-42.98194 57.90698,-80.4187c0,-46.81665 -37.93335,-84.75 -84.75,-84.75z"></path></g></g></svg>',
      title: 'Github Gist'
    }
  }

  /**
   * Checks if url is empty or not.
   * Returns false if empty.
   * @param {boolean} savedData 
   */
  validate(savedData) {
    if (!savedData.url.trim()) {
      return false;
    }

    return true;
  }

  render() {
    try {
      /**
       * Creates image element for Github logo
       */
      const githubLogo = document.createElement('img')
      githubLogo.src = GithubLogo
      githubLogo.alt = "Github Logo"
      githubLogo.classList.add('github-logo')

      /**
       * Creates input element for Github Gist URL
       */
      const urlInput = document.createElement('input')
      urlInput.id = 'gist-url-input'
      urlInput.placeholder = 'Github Gist URL'
      urlInput.classList.add('cdx-input')
      urlInput.style = 'margin: 12px 0'
      urlInput.value = this.data && this.data.url ? this.data.url : ''

      /**
       * Creates input element for Caption 
       */
      const captionInput = document.createElement('input')
      captionInput.id = 'gist-caption-input'
      captionInput.placeholder = 'Caption'
      captionInput.classList.add('cdx-input')
      captionInput.style = 'margin: 12px 0'
      captionInput.value = this.data && this.data.caption ? this.data.caption : ''

      /**
       * Creates input element for Height of the Gist (in px)
       * NOTE: Height should ne >= 100px
       */
      const heightInput = document.createElement('input')
      heightInput.id = 'gist-height-input'
      heightInput.placeholder = 'Height of the Gist ( >= 100 in px)'
      heightInput.classList.add('cdx-input')
      heightInput.style = 'margin: 12px 0 20px'
      heightInput.type = 'number'
      heightInput.min = '100'

      /**
       * Creates a button which adds the gist to the wrapper and gives a preview.
       */
      const viewBtn = document.createElement('button')
      viewBtn.innerHTML = 'Preview'
      viewBtn.classList.add('cdx-button')
      viewBtn.style = 'margin-bottom: 20px;'

      /**
       * Creates main block container
       */
      const wrapper = document.createElement('div')
      wrapper.classList.add('wrapper')
      wrapper.appendChild(githubLogo)
      wrapper.appendChild(urlInput)
      wrapper.appendChild(captionInput)
      wrapper.appendChild(heightInput)
      wrapper.appendChild(viewBtn)

      this.wrapper = wrapper

      const pluginObj = this;

      /**
       * Calls _createGist() function whihc creates the adds the gist to the wrapper.
       */
      viewBtn.addEventListener('click', function () {
        const url = document.querySelector('#gist-url-input').value
        const caption = document.querySelector('#gist-caption-input').value

        pluginObj._createGist(url, caption);
      })

      return this.wrapper
      
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Creates an inline-frame to add the gist in the wrapper.
   * 
   * @param {string} url - URL of the Github Gist
   * @param {string} caption - caption describing the Gist
   */
  _createGist(url, caption) {
    try {
      const gistFrame = document.querySelector('#gist-frame')

      /**
       * If the inline-frame containing the Gist does not exist, create one.
       */
      if (gistFrame == null) {
        const iframe = document.createElement('iframe')
        iframe.id = 'gist-frame'
        /**
         * Adds the gist as  a srcdoc.
         */
        iframe.srcdoc = `<script src="${url}"></script>`

        /**
         * Removes the borders of the inline-frame
         */
        iframe.frameBorder = 0
        iframe.style.width = '100%'

        /**
         * wrapper for showing caption behind the gist.
         */
        const captionHolder = document.createElement('span')
        captionHolder.id = 'gist-caption'
        captionHolder.textContent = caption
        captionHolder.style = 'text-align: center; color: #808080; margin-top: -12px; font-size: 18px;'

        this.wrapper.appendChild(iframe)
        this.wrapper.appendChild(captionHolder)

        /**
         * If the inline-frame containing the Gist already exists, then update its Gist URL and caption.
         */
      } else {
        gistFrame.srcdoc = `<script src="${url}"></script>`

        const captionHolder = document.querySelector('#gist-caption')
        captionHolder.textContent = caption
      }

      /**
       * Further configures the inline-frame once the gist is loaded.
       */
      document.querySelector('#gist-frame').addEventListener('load', function () {
        /**
         * Get the updated height provided by the user
         */
        const heightInput = document.querySelector('#gist-height-input')
        const height = parseInt(heightInput.value)

        /**
         * Checks if the Height < minimum height (100px) and Height > actual height og the gist.
         */
        if (height && height >= 100 && height < this.contentWindow.document.body.scrollHeight) {
          this.style.height = height + 'px'

          const gistCodeWrapper = this.contentWindow.document.querySelector('.gist-data')
          gistCodeWrapper.style.height = (height - 72) + 'px'
          gistCodeWrapper.overflow = 'scroll'

          /**
           * If the height does not follow the constraints specified above, then assign the actual height of the Gist.
           */
        } else {
          /**
           * Set the height of the inline frame equal to the height of the Gist.
           */
          this.style.height = this.contentWindow.document.body.scrollHeight + 16 + 'px'
          heightInput.value = this.contentWindow.document.body.scrollHeight + 16
        }

        /**
         * Makes all the links in the inline-frame on click, to open in a new tab of the browser 
         * rather than inside the inline-frame itself.
         */
        const links = this.contentWindow.document.getElementsByTagName('a')

        for (let i = 0; i < links.length; i++) {
          links[i].setAttribute('target', '_blank')
        }
      })

    } catch (error) {
      console.log(error)
    }
  }

  save(blockContent) {
    /**
     * Returns output as:
     * url - URL of the Github Gist.
     * caption - Caption provided by the user (giving more context about the added Gist).
     * height - Height of the Gist.
     */
    return {
      url: blockContent.querySelector('#gist-url-input').value,
      caption: blockContent.querySelector('#gist-caption-input').value,
      height: parseInt(blockContent.querySelector('#gist-height-input').value)
    }
  }
}
