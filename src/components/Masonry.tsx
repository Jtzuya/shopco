import imgCasual from '../assets/casual.png'
import imgFormal from '../assets/formal.png'
import imgParty from '../assets/party.png'
import imgGym from '../assets/gym.png'

export default function Masonry() {
  return(
    <section className="masonry">
      <div className="masonry__wrapper">
        <h3 className="masonry__heading">BROWSE BY dress STYLE</h3>
        <div className="masonry__blocks">
          <div className="masonry__block">
            <p className="masonry__block-title">Casual</p>
            <img src={imgCasual} alt="" />
          </div>

          <div className="masonry__block masonry__block--stretched">
            <p className="masonry__block-title">Casual</p>
            <img src={imgFormal} alt="" />
          </div>
  
          <div className="masonry__block masonry__block--stretched">
            <p className="masonry__block-title">Casual</p>
            <img src={imgParty} alt="" />
          </div>

          <div className="masonry__block">
            <p className="masonry__block-title">Casual</p>
            <img src={imgGym} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}