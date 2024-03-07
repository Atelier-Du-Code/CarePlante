import React, { useState } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const CardPlante = ({ lstPlantesAffichage, onPanelOpen }) => {
    const [expandedPanel, setExpandedPanel] = useState(null);

    const handlePanelClick = (planteId) => {
        onPanelOpen(planteId);
    };

    const onChange = (key) => {
        setExpandedPanel(key.length > 0 ? key[0] : null);
    };

    const panelsWithUniqueKeys = lstPlantesAffichage.map((plante, index) => (
        <Panel key={index} header={plante.name} onClick={() => handlePanelClick(plante._id)}>
            <p>Nom : {plante.name}</p>
            {/* Ajoutez d'autres informations sur la plante si nécessaire */}
        </Panel>
    ));

    return (
        <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '10px', border: '1px solid #ebedf0', borderRadius: '4px' }}>
            <Collapse onChange={onChange} activeKey={expandedPanel} accordion>
                {panelsWithUniqueKeys}
            </Collapse>
        </div>
    );
};

export default CardPlante;
