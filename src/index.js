import './index.css'
import GithubIcon from './assets/github-icon.svg'
import createPluginUI from './ui.js'
import createGist from './create-gist.js'


export default class Gist {
  constructor({ data }) {
    this.data = data

    /**
     * container for the entire block.
     */
    this.wrapper = null

    /**
     * url of the gist.
     */
    this.url = ''
  }

  static get toolbox() {
    return {
      icon: GithubIcon,
      title: 'Github Gist'
    }
  }

  /**
   * @param {boolean} - savedData 
   */
  validate(savedData) {
    /**
     * Checks if url is empty or not.
     * Returns false if empty.
     */
    if (!savedData.url.trim()) {
      return false
    }

    return true
  }

  render() {
    try {
      /**
       * creates the UI of the plugin and returns its wrapper element.
       */
      return createPluginUI(this)
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
    return createGist(this, url, caption)
  }

  save(blockContent) {
    /**
     * Returns output as:
     * url - URL of the Github Gist.
     * caption - Caption provided by the user (giving more context about the added Gist).
     * height - Height of the Gist.
     */
    return {
      url: this.url,
      caption: blockContent.querySelector('#gist-caption-input').value,
      height: parseInt(blockContent.querySelector('#gist-height-input').value)
    }
  }
}
