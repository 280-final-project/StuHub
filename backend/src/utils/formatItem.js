function formatItem(item) {
  return {
    id: item.item_id,
    title: item.item_name,
    description: item.item_desc,
    timeframe: item.timeframe,
    location: item.loc_content,
    image: item.img_url,

    // new fields
    user_name: item.user_name,
    pfp_url: item.pfp_url,
  };
}

module.exports = formatItem;