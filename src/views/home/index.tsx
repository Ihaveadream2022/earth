import { Row, Col } from "antd";
import "./home.scss";
import imgNight from "../../assets/images/night.png";

function Home() {
    return (
        <div>
            <Row>
                <Col span={12} className="Home-l">
                    <div>
                        <img src={imgNight} alt="imgNight" />
                    </div>
                </Col>
                <Col span={12} className="Home-r">
                    <Row>
                        <Col span={24} className="Home-r-t">
                            <div></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="Home-r-b">
                            <div></div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Home;
