/**
 * Creates an inline-frame to add the gist in the wrapper.
 * 
 * @param {object} pluginObj - plugin class object.
 * @param {string} url - URL of the Github Gist
 * @param {string} caption - caption describing the Gist
 */
export default function createGist(pluginObj, url, caption) {
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

      pluginObj.wrapper.appendChild(iframe)
      pluginObj.wrapper.appendChild(captionHolder)

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
      try {
        /**
         * if gist is not loaded, then throw error.
         */
        if (this.contentWindow.document.querySelector('.gist') == null) {
          throw new Error('Invalid URL provided')
        } else {
          pluginObj.url = url

          /**
           * Removes if any error present.
           */
          if (document.querySelector('.error-wrapper') != null) {
            document.querySelector('.error-wrapper').remove()
          }
        }
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
      } catch (error) {
        console.error(error)

        /**
         * Replace url to empty string when url is invalid.
         */
        pluginObj.url = ''
        /**
         * append error node if not already present.
         */
        const errorNode = document.querySelector('.error-wrapper')

        if (errorNode == null) {
          /**
           * Creates error node.
           */
          const errorWrapper = document.createElement('div')
          errorWrapper.textContent = 'Invalid URL provided.'
          errorWrapper.classList.add('error-wrapper')

          pluginObj.wrapper.appendChild(errorWrapper)
        } else {
          /**
           * Changes error message if error wrapper is already present.
           */
          errorNode.textContent = 'Invalid Gist ID or Username.'
        }

        /**
         * Removes if any gist and caption holder present.
         */
        if (document.getElementById('gist-frame') != null) {
          document.getElementById('gist-frame').remove()
        }

        if (document.getElementById('gist-caption') != null) {
          document.getElementById('gist-caption').remove()
        }
      }
    })

  } catch (error) {
    console.log(error)
  }
}