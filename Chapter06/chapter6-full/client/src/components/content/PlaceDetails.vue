<script>
export default {
  props: {
    name: String,
    address: String,
  },

  render (h) {
    return <div class="details">
      <div class="name"><i class="material-icons">place</i> {this.name}</div>
      <div class="address"> {this.address}</div>
    </div>
  },
}
</script>
