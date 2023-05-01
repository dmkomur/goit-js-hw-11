export default function makeMarkup(array) {
    const markupStrings = array.map(el => {
        return `<div class="photo-card">
  <img src="${el.previewURL
}" alt="${el.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${el.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${el.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${el.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${el.downloads
}
    </p>
  </div>
</div>`

    })

    return markupStrings.join('')

}