import GithubLogo from './assets/github-logo.png'

/**
 * Creates plugin UI.
 * @param {object} pluginObj - plugin class object.
 * 
 * @retruns {HTMLDivElement} this.wrapper - Wrapper containing the whole UI.
 */
export default function createPluginUI(pluginObj) {
    try {
        /**
         * Creates image element for Github logo.
         */
        const githubLogo = document.createElement('img')
        githubLogo.src = GithubLogo
        githubLogo.alt = "Github Logo"
        githubLogo.classList.add('github-logo')

        /**
         * Creates input element for Github Gist URL.
         */
        const urlInput = document.createElement('input')
        urlInput.id = 'gist-url-input'
        urlInput.placeholder = 'Github Gist URL'
        urlInput.classList.add('cdx-input')
        urlInput.style = 'margin: 12px 0; width: 100%;'
        urlInput.value = pluginObj.data && pluginObj.data.url ? pluginObj.data.url : ''

        /**
         * Creates input element for Caption.
         */
        const captionInput = document.createElement('input')
        captionInput.id = 'gist-caption-input'
        captionInput.placeholder = 'Caption'
        captionInput.classList.add('cdx-input')
        captionInput.style = 'margin: 12px 0; width: 100%;'
        captionInput.value = pluginObj.data && pluginObj.data.caption ? pluginObj.data.caption : ''

        /**
         * Creates input element for Height of the Gist (in px).
         * NOTE: Height should ne >= 100px.
         */
        const heightInput = document.createElement('input')
        heightInput.id = 'gist-height-input'
        heightInput.placeholder = 'Height of the Gist ( >= 100 in px)'
        heightInput.classList.add('cdx-input')
        heightInput.style = 'margin: 12px 0 20px; width: 100%;'
        heightInput.type = 'number'
        heightInput.min = '100'
        heightInput.value = 100

        /**
         * Creates a button which adds the gist to the wrapper and gives a preview.
         */
        const previewBtn = document.createElement('button')
        previewBtn.innerHTML = 'Preview'
        previewBtn.classList.add('cdx-button')
        previewBtn.style = 'margin-bottom: 20px; width: 82px'

        /**
         * Creates main block container.
         */
        const wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')
        wrapper.appendChild(githubLogo)
        wrapper.appendChild(urlInput)
        wrapper.appendChild(captionInput)
        wrapper.appendChild(heightInput)
        wrapper.appendChild(previewBtn)

        /**
         * Assigns UI wrapper to the wrapper class property.
         */
        pluginObj.wrapper = wrapper

        /**
         * Calls _createGist() function which creates the adds the gist to the wrapper.
         */
        previewBtn.addEventListener('click', function () {
            try {
                const url = document.querySelector('#gist-url-input').value

                if (url && url != '') {
                    if (url.startsWith('https://gist.github.com/')) {
                        const caption = document.querySelector('#gist-caption-input').value

                        pluginObj._createGist(url, caption);
                    } else {
                        throw new Error('Provided URL is not associated with Github')
                    }
                }
            } catch (error) {
                console.error(error)

                /**
                 * replacing invalid URL with empty string.
                 */
                document.getElementById('gist-url-input').value = ''
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
                    errorNode.textContent = 'Invalid URL provided.'
                }

                /**
                 * Removes if any  gist and caption holder present.
                 */
                if (document.getElementById('gist-frame') != null) {
                    document.getElementById('gist-frame').remove()
                }

                if (document.getElementById('gist-caption') != null) {
                    document.getElementById('gist-caption').remove()
                }
            }
        })

        return pluginObj.wrapper
    } catch (error) {
        console.error(error)
    }
}