import React, {useEffect, useState} from 'react';
import Layout from "../../Containers/Layout";
import {
    callback, deleteDoctor, deleteSection, deleteTimeSlot, fetchDoctors, fetchDoctorsWithTime,
    fetchSection, fetchServices, fetchTimeSlots,
} from "./actions";
import {Tabs, Card} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import styles from './administration.module.scss'
import {
    formAddDoctor,
    formAddSection,
    formAddService,
    formAddTimeSlots,
    selectTimeSlotsDoctors
} from "./components/forms";
import moment from 'moment';

const {TabPane} = Tabs;

const Content = () => {
    const [state, setState] = useState({
        mounted: false,
        /*for section*/
        name: '',
        description: '',
        /*for doctor*/
        firstName: '',
        lastName: '',
        specialization: '',
        section: 0,
        /*sections*/
        sections: [],
        services: [],
        /*time interval*/
        day: 'Luni',
        startDate: moment(),
        endDate: moment(),
        /*time slots*/
        timeslots: [],
        /*doctors*/
        doctors: [],
        doctorsFullInfo: [],
        /*pentru asociere doctor - timeslot*/
        doctor: null,
        timeslot: null,
        /*pentru serviciu*/
        price: null,
        currency: null
    });
    useEffect(() => {
        if (!state.mounted) {
            fetchSection(setState);
            fetchServices(setState);
            fetchTimeSlots(setState);
            fetchDoctors(setState);
            fetchDoctorsWithTime(setState);
            setState(prevState => ({
                ...prevState,
                mounted: true
            }));
        }
    });
    return (
        <div className={styles.container}>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Adauga sectie" key="1" className={styles.antTabsNav}>
                    {formAddSection(state, setState)}
                    <div style={{display: 'flex', flexDirection: 'column', height: '50vh', overflow: 'auto'}}>
                        {state.sections.length > 0 && state.sections.map(section =>
                            <Card
                                actions={[
                                    <DeleteOutlined onClick={() => deleteSection(section, setState)}
                                                    key="ellipsis"/>
                                ]}
                                size="small"
                                title={section.name} style={{width: '100%', margin: '5px 0 0 0'}}>
                                <p>{section.description}</p>
                            </Card>
                        )}
                    </div>
                </TabPane>
                <TabPane tab="Adauga doctori" key="2">
                    {formAddDoctor(state, setState)}
                    <div style={{display: 'flex', flexDirection: 'column', height: '50vh', overflow: 'auto'}}>
                        {state.doctors.length > 0 && state.doctors.map(doctor =>
                            <Card
                                actions={[
                                    <DeleteOutlined onClick={() => deleteDoctor(doctor, setState)}
                                                    key="ellipsis"/>
                                ]}
                                size="small"
                                title={doctor.first_name + ' ' + doctor.last_name}
                                style={{width: '100%', margin: '5px 0 0 0'}}>
                                <p>{doctor.specialization}</p>
                            </Card>
                        )}
                    </div>
                </TabPane>
                <TabPane tab="Adauga intervale orare" key="3">
                    {formAddTimeSlots(state, setState)}
                    <div style={{display: 'flex', flexDirection: 'column', height: '50vh', overflow: 'auto'}}>
                        {state.timeslots.length > 0 && state.timeslots.map(timeslot =>
                            <Card
                                actions={[
                                    <DeleteOutlined onClick={() => deleteTimeSlot(timeslot.value, setState)}
                                                    key="ellipsis"/>
                                ]}
                                size="small"
                                title={timeslot.value.day}
                                style={{width: '100%', margin: '5px 0 0 0'}}>
                                <p>{timeslot.value.interval}</p>
                            </Card>
                        )}
                    </div>
                </TabPane>
                <TabPane tab="Program doctori" key="4">
                    {selectTimeSlotsDoctors(state, setState)}
                    <div style={{display: 'flex', flexDirection: 'column', height: '50vh', overflow: 'auto'}}>
                        {state.doctorsFullInfo.length > 0 && state.doctorsFullInfo.map(doctor =>
                            <Card
                                actions={[
                                    <DeleteOutlined onClick={() => deleteTimeSlot(doctor, setState)}
                                                    key="ellipsis"/>
                                ]}
                                size="small"
                                title={doctor.first_name + ' ' + doctor.last_name}
                                style={{width: '100%', margin: '5px 0 0 0'}}>
                                <p>{doctor.value.day + ' ' + doctor.value.interval}</p>
                                <p>{doctor.specialization}</p>
                            </Card>
                        )}
                    </div>
                </TabPane>
                <TabPane tab="Adauga servicii" key="5">
                    {formAddService(state, setState)}
                    <div style={{display: 'flex', flexDirection: 'column', height: '50vh', overflow: 'auto'}}>
                        {state.services.length > 0 && state.services.map(service =>
                            <Card
                                actions={[
                                    <DeleteOutlined onClick={() => deleteSection(service, setState)}
                                                    key="ellipsis"/>
                                ]}
                                size="small"
                                title={service.name} style={{width: '100%', margin: '5px 0 0 0'}}>
                                <p>{service.description}</p>
                                <p>Pret {service.price} {service.currency}</p>
                            </Card>
                        )}
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
};
/*for adding informations*/
export const AdministrationPage = props => {
    return (
        <Layout content={(<Content/>)}/>
    )
};
