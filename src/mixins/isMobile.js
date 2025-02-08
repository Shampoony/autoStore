export function useMobile(breakPoint = 600) {
  return {
    data() {
      return {
        isMobile: false
      }
    },
    methods: {
      checkMobile() {
        this.isMobile = window.innerWidth <= breakPoint
      }
    },
    mounted() {
      this.checkMobile()
      window.addEventListener('resize', this.checkMobile)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkMobile)
    }
  }
}
