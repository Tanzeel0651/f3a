import logo from '@/assets/logo.svg';
import styles from '@/pages/Home/Home.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactTyped from 'react-typed';

function Home() {
  return (
    <div className={styles.Home}>
      <Card style={{ width: '100rem' }}>
        <Card.Body>
          <Card.Title>Today's Quote</Card.Title>
          <Card.Text>
            <ReactTyped
              strings={[
                '"The most valuable player is the one who makes the most players valuable.   - Peyton Manning"',
              ]}
              typeSpeed={100}
              loop
            />
          </Card.Text>
        </Card.Body>
      </Card>
      <Carousel className="carousel" showArrows={true} showThumbs={false}>
        <div>
          <img
            src="https://images.squarespace-cdn.com/content/v1/6528415c9932cb0fc29c3b32/7fe159da-c6ef-455e-8a4b-297df97697dc/IMG6665544827173519927.jpg"
            alt="Slide 1"
          />
          <p className="legend">Caption for Slide 1</p>
        </div>
        <div>
          <img
            src="https://assets.bundesliga.com/tachyon/sites/2/2020/02/GettyImages-1160193334-scaled.jpg?crop=0px,134px,2560px,1438px&fit=1140,1140"
            alt="Slide 2"
          />
          <p className="legend">Caption for Slide 2</p>
        </div>
        <div>
          <img
            src="https://assets.bundesliga.com/tachyon/sites/2/2019/06/imago37480401h.jpg?crop=0px,194px,4565px,2567px&fit=1140,1140"
            alt="Slide 3"
          />
          <p className="legend">Caption for Slide 3</p>
        </div>
        <div>
          <img
            src="https://www.lacoliseum.com/wp-content/uploads/2019/07/Soccer-at-Coliseum.jpg?crop=0px,194px,4565px,2567px&fit=1140,1140"
            alt="Slide 4"
          />
          <p className="legend">Caption for Slide 3</p>
        </div>
      </Carousel>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Home;