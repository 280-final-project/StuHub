// Maps the {id, type} pairs the AI returns in its `relatedItems` trailer
// to a clickable destination + display label.

export function relatedItemLink({ id, type }) {
  switch (type) {
    case "event":
      return { href: `/events/${id}`, label: "Event" };
    case "deal":
      return { href: "/deals", label: "Deal" };
    case "resource":
      return { href: "/resources", label: "Resource" };
    default:
      return { href: "/", label: "Item" };
  }
}
