<script>
import { date } from '../../filters'

export default {
  functional: true,

  render (h, { props }) {
    const { comment } = props
    return <div class="comment">
      <img class="avatar" src={comment.author.profile.photos[0].value} />
      <div class="message">
        <div class="info">
          <span class="name">{comment.author.profile.displayName}</span>
          <span class="date">{date(comment.date)}</span>
        </div>
        <div class="content">{comment.content}</div>
      </div>
    </div>
  },
}
</script>
