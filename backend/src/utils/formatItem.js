function formatItem(item) {
  return {
    id: item.item_id,
    title: item.item_name,
    description: item.item_desc,
    timeframe: item.timeframe,
    location: item.loc_content,
    image: item.img_url,
  };
}

module.exports = formatItem;