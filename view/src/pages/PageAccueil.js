import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Layout } from "antd";
import CardPlante from '../components/Accueil/CardPlante';
import Scene3D from '../components/Accueil/Scene3D';

const PageAccueil = () => {
    const [toutesPlantes, setToutesPlantes] = useState([]);
    const [planteSelectionneeId, setPlanteSelectionneeId] = useState(null);
    const [urlImagePlante, setUrlImagePlante] = useState(null);
    const [showScene, setShowScene] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response_toutesPlantes = await fetch(`http://localhost:4000/api/plantes/plantes`);
                const lstTempToutesPlantes = await response_toutesPlantes.json();
                setToutesPlantes(lstTempToutesPlantes);
            } catch (error) {
                console.error('Erreur lors de la récupération de toutes les plantes', error);
            }
        };

        fetchData();
    }, []);

    const handlePanelOpen = (planteId) => {
        
        if (planteSelectionneeId === planteId) {
            setPlanteSelectionneeId(null);
        } else {
            // Sinon, ouvrez le panneau avec la nouvelle plante
            setPlanteSelectionneeId(planteId);
        }   
    };

    useEffect(() => {
        // Utiliser useEffect pour surveiller les changements dans planteSelectionneeId
        const planteSelectionnee = toutesPlantes.find(plante => plante._id === planteSelectionneeId);
    
        if (planteSelectionnee) {
            // Si une plante est sélectionnée, afficher la scène
            setUrlImagePlante(planteSelectionnee.photo);
            setShowScene(true);
        } else {
            // Sinon, masquer la scène
            setUrlImagePlante(null);
            setShowScene(false);
        }
    }, [planteSelectionneeId, toutesPlantes]);

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Row justify="space-between" align="middle" style={{ backgroundColor: "purple", textAlign: "left" }}>
                        <h2 style={{ backgroundColor: "grey", textAlign: "left" }}>enzkenjdknze</h2>
                        <h1 style={{ backgroundColor: "blue", textAlign: "center" }}>CarePlante</h1>
                        <Button style={{ backgroundColor: "green", textAlign: "right" }}>Bouton test</Button>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={12} style={{ backgroundColor: "blue" }}>
                    <h1>C'est le body</h1>
                    <h1>C'est le body</h1>
                    <h1>C'est le body</h1>
                   
                    <div style={{ maxHeight: '300px' }}>
                            <Scene3D />
                            {urlImagePlante && <img src={urlImagePlante} alt="Image de la plante" />}
                        </div>
                   
                </Col>
                <Col span={12} justify="space-between" align="middle" style={{ backgroundColor: "green" }}>
                    <h1>Liste des plantes</h1>
                    <Button style={{ marginRight: "10px" }}>Catalogue</Button>
                    <Button>Favoris</Button>

                    <Row>
                        <Layout style={{ backgroundColor: "red", marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}>
                            <CardPlante lstPlantesAffichage={toutesPlantes} onPanelOpen={handlePanelOpen} />
                        </Layout>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={24} style={{ backgroundColor: "red" }}>
                    <h1>C'est le footer</h1>
                </Col>
            </Row>
        </div>
    );
};

export default PageAccueil;
