import axios from 'axios'
import {NOTIFICATION_TYPES, openNotification} from "../Notifications/notifications";
import moment from 'moment';
/*handle change*/
export const handleChange = (setState, event, field) => {
    // console.log(event, field);
    if (field === 'section' ||
        field === 'day' ||
        field === 'startDate' ||
        field === 'doctor' ||
        field === 'timeslot' ||
        field === 'currency' ||
        field === 'endDate') {
        setState(prevState => ({
            ...prevState,
            [field]: event
        }))
    } else {
        event.persist();
        setState(prevState => ({
            ...prevState,
            [field]: event.target.value
        }))
    }
};
/*submissions*/
export const onSubmitSection = (name, description, setState) => {
    axios.post('http://localhost:3003/api/admin/add/section', {
        name: name,
        description: description
    }).then(response => {
        fetchSection(setState)
        openNotification('Adaugare sectie', "Sectia a fost adaugata cu succes!", NOTIFICATION_TYPES.SUCCESS);

    }).catch(e => {
        openNotification('Adaugare sectie', "Sectia nu a putut fi adaugata!", NOTIFICATION_TYPES.ERROR);

    })
};
export const onSubmitDoctor = (first_name, last_name, specialization, section, sections, setState) => {
    axios.post('http://localhost:3003/api/admin/add/doctor', {
        firstName: first_name,
        lastName: last_name,
        specialization: specialization,
        sectionId: sections.filter(sect => sect.name === section)[0].id
    }).then(response => {
        fetchDoctors(setState);
        openNotification('Adaugare doctor', "Doctorul a fost adaugat cu succes!", NOTIFICATION_TYPES.SUCCESS);
    }).catch(e => {
        openNotification('Adaugare doctor', "Doctorul nu a putut fi adaugat!", NOTIFICATION_TYPES.ERROR);

    })
};
export const onSubmitTimeInterval = (day, start, end, setState) => {
    const value = {
        day: day,
        interval: moment(start).format('LT') + ' - ' + moment(end).format('LT')
    };
    axios.post('http://localhost:3003/api/admin/add/timeslot', {
        value
    }).then(response => {
        fetchTimeSlots(setState);
        openNotification('Adaugare interval timp', "Intervalul a fost adaugat cu succes!", NOTIFICATION_TYPES.SUCCESS);
    }).catch(e => {
        openNotification('Adaugare interval timp', "Intervalul nu a putut fi adaugat!", NOTIFICATION_TYPES.ERROR);

    })
};
export const onSubmitDoctorTimeSlot = (state, doctor, timeslot, setState) => {
    const doctor_id = state.doctors.filter(doc => (doc.first_name + ' ' + doc.last_name) === doctor)[0].id;
    const timeSlot = state.timeslots.filter(timesl => (timesl.value.day + ' ' + timesl.value.interval) === timeslot)[0].id;
    console.log(doctor_id, timeSlot);
    axios.post('http://localhost:3003/api/admin/add/doctortimeslot', {
        idDoctor: doctor_id,
        idTimeSlot: timeSlot
    }).then(response => {
        fetchDoctorsWithTime(setState);
        openNotification('Adaugare interval timp', "Intervalul a fost adaugat cu succes!", NOTIFICATION_TYPES.SUCCESS);
    }).catch(e => {
        openNotification('Adaugare interval timp', "Intervalul nu a putut fi adaugat!", NOTIFICATION_TYPES.ERROR);

    })
};
export const onSubmitService = (state, setState) => {
    const doctor_id = state.doctors.filter(doc => (doc.first_name + ' ' + doc.last_name) === state.doctor)[0].id;
    const timeSlot = state.timeslots.filter(timesl => (timesl.value.day + ' ' + timesl.value.interval) === state.timeslot)[0].id;
    console.log(doctor_id, timeSlot);
    axios.post('http://localhost:3003/api/admin/add/service', {
        name: state.name,
        description: state.description,
        price: state.price,
        currency: state.currency,
        doctorId: doctor_id,
        intervalId: timeSlot
    }).then(response => {
        fetchServices(setState);
        console.log(state.doctors.map(doctor => doctor.id === doctor_id));
        openNotification('Adaugare serviciu', "Serviciul a fost adaugat cu succes!", NOTIFICATION_TYPES.SUCCESS);
    }).catch(e => {
        openNotification('Adaugare serviciu', "Serviciul nu a putut fi adaugat!", NOTIFICATION_TYPES.ERROR);

    })
};
export const callback = key => {
    console.log(key);
};

/*fetch data*/
export const fetchSection = setState => {
    axios.get('http://localhost:3003/api/user/sections')
        .then(response => {
            // console.log(response.data.data)
            setState(prevState => ({
                ...prevState,
                sections: response.data.data.sections
            }))
        })
};
export const fetchServices = setState => {
    axios.get('http://localhost:3003/api/user/services')
        .then(response => {
            setState(prevState => ({
                ...prevState,
                services: response.data.data.services
            }))
        })
};
export const fetchTimeSlots = setState => {
    axios.get('http://localhost:3003/api/user/timeslots')
        .then(response => {
            // console.log(response.data.data)
            setState(prevState => ({
                ...prevState,
                timeslots: response.data.data.timeSlots
            }))
        })
};

export const fetchDoctors = setState => {
    axios.get('http://localhost:3003/api/user/doctors')
        .then(response => {
            // console.log(response.data.data)
            setState(prevState => ({
                ...prevState,
                doctors: response.data.data.doctors
            }))
        })
}
export const fetchDoctorsWithTime = setState => {
    axios.get('http://localhost:3003/api/user/doctorswithtimeslots')
        .then(response => {
            console.log(response.data.data)
            setState(prevState => ({
                ...prevState,
                doctorsFullInfo: response.data.data.doctors
            }))
        })
};

/*delete data*/
export const deleteSection = (section, setState) => {
    axios.post('http://localhost:3003/api/admin/delete/section', {
        id: section.id
    }).then(response => {
        fetchSection(setState);
    })
};
export const deleteDoctor = (doctor, setState) => {
    axios.post('http://localhost:3003/api/admin/delete/doctor', {
        id: doctor.id
    }).then(response => {
        fetchSection(setState);
    })
};
export const deleteService = (service, setState) => {
    axios.post('http://localhost:3003/api/admin/delete/service', {
        id: service.id
    }).then(response => {
        fetchSection(setState);
    })
};
export const deleteTimeSlot = (timeslot, setState) => {
    axios.post('http://localhost:3003/api/admin/delete/timeslot', {
        id: timeslot.id
    }).then(response => {
        fetchSection(setState);
    })
};
export const getTimeSlotWithDoctor = (setState, doctor) => {
    axios.get('http://localhost:3003/api/user/gettimeslotwithdoctor?id=' + doctor)
        .then(response => {
            console.log(response.data.data)
        })
};
