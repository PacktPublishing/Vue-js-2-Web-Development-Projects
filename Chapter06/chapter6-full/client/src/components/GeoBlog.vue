<script>
import AppMenu from './AppMenu.vue'
import BlogMap from './BlogMap.vue'
import BlogContent from './content/BlogContent.vue'

export default {
  render (h) {
    return <div class="geo-blog">
      <AppMenu />
      <div class="panes">
        <BlogMap />
        <BlogContent />
      </div>
    </div>
  }
}
</script>
