import ItemList from "./item-list"
import SummaryBox from "./summary-box"

export default function Page() {
  return (
    <section className="my-20 flex gap-20 items-baseline">
      <ItemList />
    </section>
  )
}
