function formatItem(item) {
  return {
    id: item.item_id,
    title: item.item_name,
    description: item.item_desc,
    timeframe: item.timeframe,
    location: item.loc_content,
    image: item.img_url,
    isCoordinate: item.loc_is_coordinate
  };
}

module.exports = formatItem;