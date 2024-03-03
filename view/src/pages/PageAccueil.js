import React from 'react';

import "antd/dist/antd"
import { Row, Col, Button, Layout } from "antd";

import CardPlante from '../components/Accueil/CardPlante';

const PageAccueil = () => {

    return(

        <div>
            {/* Section du header */}
            <Row>
                <Col span={24}>
                    <Row justify="space-between" align="middle" style={{backgroundColor:"purple", textAlign: "left"}}>                        
                        <h2 style={{backgroundColor:"grey", textAlign: "left"}}>enzkenjdknze</h2>
                        <h1 style={{backgroundColor:"blue", textAlign: "center"}}>CarePlante</h1>
                        <Button style={{backgroundColor:"green", textAlign: "right"}}>Bouton test</Button>
                    </Row>
                </Col>
            </Row>

            {/* Section du body */}
            <Row>
                <Col span={12} style={{ backgroundColor: "blue" }}>
                    <h1>C'est le body</h1>
                    <h1>C'est le body</h1>
                    <h1>C'est le body</h1>

                </Col>
                <Col span={12} justify="space-between" align="middle" style={{ backgroundColor: "green" }}>
                    
                    <h1>Liste des plantes</h1>
                    <Button style={{marginRight:"10px"}}>Catalogue</Button>
                    <Button>Favoris</Button>

                   <Row>
                    <Layout style={{ backgroundColor: "red" }}>
                        <CardPlante />
                    <h1>plante</h1>
                    <h1>plante</h1>
                    <h1>plante</h1>
                    </Layout>
                    
                   
                   </Row>
                   
                </Col> 
            </Row>

            {/* Section du footer */}
            <Row>
                <Col span={24} style={{backgroundColor:"red"}}>
                    <h1>C'est le footer</h1>
                </Col>
            </Row>
        </div>

    )
}

export default PageAccueil;