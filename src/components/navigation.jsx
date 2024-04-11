function scrollTo(e){
  e.preventDefault()
  document.querySelector(e.target.dataset['url']).scrollIntoView({ behavior: "smooth", block: "nearest" })
}

export default function Navigation() {
  return (
    <div className='navigation'>
      <a onClick={e => scrollTo(e)} data-url='#comparison'>
      {window.outerWidth > 765 
        ? 'ІСЦ/цін виробників'
        : 'ІСЦ/ІЦВ'
      }
      </a> 
      <a onClick={e => scrollTo(e)} data-url='#correlation'>
      {window.outerWidth > 765 
        ? 'Співвідношення товарних груп'
        : 'ІСЦ товарних груп'
      }
      </a>
      <a onClick={e => scrollTo(e)} data-url='#details'>ІСЦ по регіонах</a>
      <a onClick={e => scrollTo(e)} data-url='#industrial'>
      {window.outerWidth > 765
        ? 'Порівняння по регіонах'
        : 'ІСЦ/ІЦВ по регіонах'
      }
      </a>
    </div>
  )
}
