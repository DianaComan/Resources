import {Button, Form, Input, Select, TimePicker} from "antd";
import {
    handleChange,
    onSubmitDoctor,
    onSubmitDoctorTimeSlot,
    onSubmitSection, onSubmitService,
    onSubmitTimeInterval
} from "../actions";
import styles from "../administration.module.scss";
import React from "react";
import moment from 'moment';
import {PlusSquareOutlined} from '@ant-design/icons';

const format = 'HH:mm';
const days = [
    'Luni',
    'Marti',
    'Miercuri',
    'Joi',
    'Vineri',
    'Sambata',
    'Duminica'
]
export const formAddService = (state, setState) => {
    return (<Form
        layout={'vertical'}
        onFinish={onSubmitSection}
    >
        <Form.Item
            name="name"
            rules={[
                {
                    required: true,
                    message: 'Serviciul trebuie sa aiba un nume!',
                },
            ]}
        >
            <Input value={state.name} onChange={event => handleChange(setState, event, 'name')} placeholder="Nume"/>
        </Form.Item>
        <Form.Item
            name="description"
            rules={[
                {
                    required: true,
                    message: 'Serviciul trebuie sa aiba o descriere!',
                },
            ]}
        >
            <Input.TextArea
                value={state.description} onChange={event => handleChange(setState, event, 'description')}
                type="description"
                placeholder="Descriere"
            />
        </Form.Item>
        <Form.Item>
            <Input.Group>
                <Input
                    placeholder="Pret"
                    style={{width: '25%'}}
                    value={state.price}
                    onChange={event => handleChange(setState, event, 'price')}
                />
                <Select
                    placeholder="Valuta"
                    onChange={event => handleChange(setState, event, 'currency')}
                    style={{width: '25%'}}
                >
                    <Select.Option value={'RON'} key={1}>RON</Select.Option>
                    <Select.Option value={'EURO'} key={2}>EURO</Select.Option>
                </Select>
                <Select
                    style={{width: '25%'}}
                    placeholder={'Alege doctor'}
                    onChange={event => handleChange(setState, event, 'doctor')}>
                    {
                        state.doctors.length > 0 && state.doctors.map((doctor, index) => {
                            return (
                                <Select.Option key={index}
                                               value={doctor.first_name + ' ' + doctor.last_name}>
                                    {doctor.first_name + ' ' + doctor.last_name}
                                </Select.Option>
                            )
                        })
                    }
                </Select>
                <Select
                    style={{width: '25%'}}
                    placeholder={'Alege interval'}
                    onChange={event => handleChange(setState, event, 'timeslot')}>
                    {
                        state.timeslots.length > 0 && state.timeslots.map((timeslot, index) => {
                            return (
                                <Select.Option key={index}
                                               value={timeslot.value.day + ' ' + timeslot.value.interval}>
                                    {timeslot.value.day + ' ' + timeslot.value.interval}
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Input.Group>
        </Form.Item>
        <Form.Item>
            <Button onClick={() => onSubmitService(state, setState)}
                    className={styles.button}>
                Salvare
            </Button>
        </Form.Item>
    </Form>)
};
export const formAddDoctor = (state, setState) => {
    return (
        <Form
            layout={'vertical'}
        >
            <Form.Item
                name="firstname"
                rules={[
                    {
                        required: true,
                        message: 'Doctorul trebuie sa aiba un prenume!',
                    },
                ]}
            >
                <Input.Group>
                    <Input
                        style={{width: '50%'}}
                        value={state.firstName}
                        onChange={event => handleChange(setState, event, 'firstName')}
                        placeholder="Prenume"/>
                    <Input
                        style={{width: '50%'}}
                        value={state.lastName}
                        onChange={event => handleChange(setState, event, 'lastName')}
                        placeholder="Nume"
                    />
                </Input.Group>
            </Form.Item>
            <Form.Item
                name="specialization"
                rules={[
                    {
                        required: true,
                        message: 'Doctorul trebuie sa aiba o specializare!',
                    },
                ]}
            >
                <Input.TextArea
                    value={state.specialization} onChange={event => handleChange(setState, event, 'specialization')}
                    placeholder="Specializare"
                />
            </Form.Item>
            <Form.Item
                name="Sectie"
                rules={[
                    {
                        required: true,
                        message: 'Doctorul trebuie sa aiba apartina unei sectii!',
                    },
                ]}
            >
                <Select
                    showSearch
                    style={{width: '100%'}}
                    onChange={event => handleChange(setState, event, 'section')}
                >
                    {state.sections.length &&
                    state.sections.map((section, index) => {
                        return (
                            <Select.Option key={index} value={section.name}>{section.name}</Select.Option>)
                    })
                    }
                </Select>
            </Form.Item>
            <Form.Item>
                <Button
                    onClick={() => {
                        onSubmitDoctor(
                            state.lastName, state.firstName, state.specialization,
                            state.section, state.sections,
                            setState)
                    }}
                    className={styles.button}>
                    Salvare
                </Button>
            </Form.Item>
        </Form>
    )
};
export const formAddTimeSlots = (state, setState) => {
    return (
        <Form
            layout={'vertical'}
        >
            <Form.Item
                name="Interval orar"
                rules={[
                    {
                        required: true,
                        message: 'Intervalul este incomplet!',
                    },
                ]}
            >
                <Input.Group>
                    <Select style={{width: '30%'}}
                            onChange={event => handleChange(setState, event, 'day')}
                            defaultValue={days[0]}
                    >
                        {days.map((day, index) => {
                            return (
                                <Select.Option key={index} value={day}>{day}</Select.Option>
                            )
                        })}
                    </Select>
                    <TimePicker
                        style={{width: '30%'}}
                        value={state.startDate}
                        onChange={event => handleChange(setState, event, 'startDate')}
                        defaultValue={moment('00:00', format)} format={format}/>
                    <TimePicker
                        style={{width: '30%'}}
                        value={state.endDate}
                        onChange={event => handleChange(setState, event, 'endDate')}
                        defaultValue={moment('00:00', format)} format={format}/>
                    <Button style={{width: '10%', height: '34px', border: 'none'}} onClick={() => {
                        onSubmitTimeInterval(state.day, state.startDate, state.endDate, setState);
                    }}><PlusSquareOutlined/></Button>
                </Input.Group>
            </Form.Item>
        </Form>
    )
};
export const formAddSection = (state, setState) => {
    return (
        <Form
            layout={'vertical'}
            onFinish={onSubmitSection}
        >
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Sectiunea trebuie sa aiba un nume!',
                    },
                ]}
            >
                <Input value={state.name} onChange={event => handleChange(setState, event, 'name')} placeholder="Nume"/>
            </Form.Item>
            <Form.Item
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Sectiunea trebuie sa aiba o descriere!',
                    },
                ]}
            >
                <Input.TextArea
                    value={state.description} onChange={event => handleChange(setState, event, 'description')}
                    type="description"
                    placeholder="Descriere"
                />
            </Form.Item>
            <Form.Item>
                <Button onClick={() => onSubmitSection(state.name, state.description, setState)}
                        className={styles.button}>
                    Salvare
                </Button>
            </Form.Item>
        </Form>
    )
};
export const selectTimeSlotsDoctors = (state, setState) => {
    return (
        <Form
            layout={'vertical'}
        >
            <Form.Item
                name="Interval orar"
                rules={[
                    {
                        required: true,
                        message: 'Asociere incompleta!',
                    },
                ]}
            >
                <Input.Group>
                    <Select
                        placeholder={'Alege doctor'}
                        style={{width: '30%'}}
                        onChange={event => handleChange(setState, event, 'doctor')}>
                        {
                            state.doctors.length > 0 && state.doctors.map((doctor, index) => {
                                return (
                                    <Select.Option key={index}
                                                   value={doctor.first_name + ' ' + doctor.last_name}>
                                        {doctor.first_name + ' ' + doctor.last_name}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                    <Select
                        placeholder={'Alege interval'}
                        style={{width: '30%'}}
                        onChange={event => handleChange(setState, event, 'timeslot')}>
                        {
                            state.timeslots.length > 0 && state.timeslots.map((timeslot, index) => {
                                return (
                                    <Select.Option key={index}
                                                   value={timeslot.value.day + ' ' + timeslot.value.interval}>
                                        {timeslot.value.day + ' ' + timeslot.value.interval}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                    <Button style={{width: '10%', height: '34px', border: 'none'}} onClick={() => {
                        onSubmitDoctorTimeSlot(state, state.doctor, state.timeslot, setState);
                    }}><PlusSquareOutlined/></Button>
                </Input.Group>
            </Form.Item>
        </Form>
    )
};
