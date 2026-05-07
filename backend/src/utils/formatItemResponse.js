function formatItemResponse(row, extra = {}) {
  return {
    id: row.item_id,
    title: row.item_name,
    description: row.item_desc,
    timeframe: row.timeframe,
    location: row.loc_content,
    image: row.img_url,
    item_type: row.item_type,
    approval_status: row.approval_status,
    ai_summary: row.ai_summary,
    ...extra,
  };
}

module.exports = formatItemResponse;
