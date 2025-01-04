import TableExample from "./components/table/TableExample"
import TableSection from "./components/table/TableSection"

export default () => {
  return (
    <section className="space-y-4">
      <h1>Transaction Report</h1>
      <TableExample />
      <TableSection />
    </section>
  )
}