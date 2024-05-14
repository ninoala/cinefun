import React from 'react'

const PageAbout = () => {
  return (
    <main class="site-main">
      <section className="about-page">
        <div className="about-page__info">
          <h1 className="about-page__heading"><span className="u-pink-text">Welcome to CineFun</span></h1>
          <p className="about-page__paragraph">
              CineFun is a movie database website where users can explore popular, top-rated, now playing, and upcoming movies. You can browse through different genres or specific movies, view their ratings, and see how they stack up against each other. If you find something you like, you can add it to your favorites or remove it at any time. CineFun was created by Reyhan Taze and Yegor Nino, students in BCIT's Front End Web Developer program.
          </p>
          <p className="about-page__paragraph"> Please note that while CineFun utilizes the TMDb API for movie data, it is not officially endorsed or certified by TMDb.</p>
          <img 
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
            alt="TMDB Logo" 
            className="about-page__img"
          />
        </div>
      </section>
    </main>
  )
}

export default PageAbout