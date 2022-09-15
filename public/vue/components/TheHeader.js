export default {
  template: `
    <div  class="fixed top-0 left-0 right-0">
      <nav
        class="flex flex-row items-center justify-between md:justify-evenly h-16 px-5 py-2 bg-white border-b shadow"
      >
        <div class="inline-flex flex-row items-center gap-3 flex-nowrap">
          <MiniliLogo class="rounded max-h-10" />
          minili
        </div>
        <ul class="flex flex-row items-center justify-between gap-5">
          <li>
            <a href="/"> Home </a>
          </li>
          <li>
            <a href="/pages/about"> About </a>
          </li>
        </ul>
      </nav>
    </div>
    `,
};
