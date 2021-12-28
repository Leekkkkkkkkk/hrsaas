import { createNamespacedHelpers } from 'vuex'
const { mapState: permissionPoint } = createNamespacedHelpers('permission')
export default {
  computed: {
    ...permissionPoint(['point'])
  },
  methods: {
    isDisabled(val) {
      const point = this.$store.state.user.userInfo.roles.points
      return !point.includes(val)
    }
  }
}
