export default function NavbarSkeleton() {
  return (
    <ul className="flex gap-2 justify-end items-center mt-2.5 lg:mt-0 lg:mr-1">
      <li className="rounded-full border border-gray-400 lg:w-10 lg:h-10 w-8 h-8 bg-gray-200 animate-pulse">
        &nbsp;
      </li>
      <li className="rounded-full border border-gray-400 lg:w-10 lg:h-10 w-8 h-8 bg-gray-200 animate-pulse">
        &nbsp;
      </li>
      <li className="lg:hidden rounded-full border border-gray-400 lg:w-10 lg:h-10 w-8 h-8 bg-gray-200 animate-pulse">
        &nbsp;
      </li>
    </ul>
  )
}
