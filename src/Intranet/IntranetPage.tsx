import React from 'react';

const IntranetPage: React.FC = () => {
  return (
    <div className="intranet-sketch-layout">
      <header className="intranet-header">
        <h1>Welcome (user)</h1>
      </header>

      {/* Slider de noticias */}
      <section className="news-slider-sketch">
        <div className="slider-control">{'<'}</div>
        <div className="slider-content">
          <h2>News, events, changes...</h2>
        </div>
        <div className="slider-control">{'>'}</div>
      </section>

      <div className="intranet-grid-main">
        {/* Enlaces rápidos */}
        <section className="quick-links-sketch">
          <h3>Quick links</h3>
          <ul>
            <li>- Worker Statute</li>
            <li>- steel agreement</li>
            <li>- Comany's rules</li>
            <li>- Ask for Vacation</li>
            <li>- Teleworking</li>
          </ul>
        </section>

        {/* Calendario */}
        <section className="calendar-sketch">
          <h3>Calendar</h3>
          <div className="calendar-placeholder-box"></div>
        </section>
      </div>

      {/* Organigrama */}
      <section className="org-chart-sketch">
        <div className="org-chart-box">
          <h2>ORGANIZATION CHART</h2>
        </div>
      </section>

      <div className="intranet-info-footer">
        <div className="footer-list">
          <h3>What do we want</h3>
          <ul>
            <li>- hvascuvasvcavc</li>
            <li>- iksfouqoetuc</li>
            <li>- oibqewfobqe</li>
          </ul>
        </div>
        <div className="footer-list">
          <h3>What we archived</h3>
          <ul>
            <li>- uabsciuqs jvd</li>
            <li>- oihohoqehfoeqife</li>
            <li>- ihefofbnqopew</li>
          </ul>
        </div>
      </div>

      {/* Formulario HRRR */}
      <section className="hr-form-sketch">
        <div className="form-box">
          <label>Message to HRRR...</label>
          <textarea placeholder="Write here..."></textarea>
          <button className="btn-send">Send</button>
        </div>
      </section>
    </div>
  );
};

export default IntranetPage;
