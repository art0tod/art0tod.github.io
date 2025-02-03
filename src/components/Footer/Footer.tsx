import { Link } from 'react-router-dom'
import style from './Footer.module.css'

export const Footer: React.FC = () => {
  return (
    <footer className={style.root}>
      <span>© 2025 <Link className={style.link} to={'https://github.com/art0tod'} target='_blank' rel='noopener noreferrer'>Artyom Todor</Link></span>
      <span className={style.social}>
        <Link className={style.link + ' ' + style.tg} to={'https://t.me/art0tod'} target='_blank' rel='noopener noreferrer'>Telegram</Link>
        <Link className={style.link} to={'https://github.com/art0tod'} target='_blank' rel='noopener noreferrer'>GitHub</Link>
      </span>
    </footer >
  )
}
