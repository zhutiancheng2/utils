export default {
  // 本地存储的key
  key: 'buke',

  /**
   * 存储token到localstorage
   * @param accessToken
   * @param refreshToken
   * @param expiresIn accessToken有效秒数
   * @return void
   */
  write (auth) {
    window.localStorage.setItem(this.key, auth.access_token)
  },

  /**
   * 取出localstorage
   * @return string
   */
  readAccessToken () {
    if (window.localStorage.getItem(this.key)) {
      return 'Bearer ' + window.localStorage.getItem(this.key)
    }
    return undefined
  },

  /**
   * 忘记auth token
   */
  forget () {
    window.localStorage.removeItem()(this.key)
  }
}
