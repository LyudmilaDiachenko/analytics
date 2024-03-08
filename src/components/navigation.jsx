function scrollTo(e){
  e.preventDefault()
  document.querySelector(e.target.dataset['url']).scrollIntoView({ behavior: "smooth" })
}

export default function Navigation() {
  return (
    <div className='navigation'>
      <a onClick={e => scrollTo(e)} data-url='#comparison'>Індекс споживчих цін / цін виробників</a>
      <a onClick={e => scrollTo(e)} data-url='#correlation'>Співвідношення товарних груп</a>
      <a onClick={e => scrollTo(e)} data-url='#details'>Порівняння по регіонах</a>
      <a onClick={e => scrollTo(e)} data-url='#industrial'>Порівняння по регіонах</a>
    </div>
  )
}
