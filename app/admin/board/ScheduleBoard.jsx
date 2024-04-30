"use client";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
  EditingState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
  Toolbar,
  DateNavigator,
  TodayButton,
  DragDropProvider,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { teal, indigo } from "@mui/material/colors";
import { fetchData } from "@/app/api/api";

const SchedulerBoard = () => {
  const isGroupByDate = () => {
    return true;
  };

  const [appoints, setAppoints] = useState();
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchAppoints = async () => {
      try {
        const appointments = await fetchData("appointments");
        setAppoints(
          appointments.map((appoint) => ({
            id: appoint.id,
            title: appoint.baseService,
            members: [appoint.associateId],
            startDate: new Date(appoint.appointmentTime),
            endDate: new Date(
              new Date(appoint.appointmentTime).getTime() + 2 * 60 * 60 * 1000
            ),
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUses = async () => {
      try {
        const users = await fetchData("users");
        setUsers(
          users.map((user) => ({
            text: user.fullName,
            id: user.id,
            color: teal,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppoints();
    fetchUses();
  }, []);

  const appointments = [
    {
      id: 0,
      title: "Watercolor Landscape",
      members: [1],
      // roomId: 1,
      startDate: new Date(2024, 4, 30, 9, 30),
      endDate: new Date(2024, 4, 30, 12, 0),
    },
    {
      id: 1,
      title: "Oil Painting for Beginners",
      members: [2],
      // roomId: 2,
      startDate: new Date(2017, 4, 28, 12, 30),
      endDate: new Date(2017, 4, 28, 14, 30),
    },
    {
      id: 2,
      title: "Testing",
      members: [2],
      // roomId: 1,
      startDate: new Date(2017, 4, 29, 12, 30),
      endDate: new Date(2017, 4, 29, 14, 30),
    },
    {
      id: 3,
      title: "Final exams",
      members: [2],
      // roomId: 2,
      startDate: new Date(2017, 4, 29, 9, 30),
      endDate: new Date(2017, 4, 29, 12, 0),
    },
  ];

  const owners = [
    {
      text: "Andrew Glover",
      id: 1,
      color: teal,
    },
    {
      text: "Arnie Schwartz",
      id: 2,
      color: indigo,
    },
  ];

  // const locations = [
  //   { text: "Room 1", id: 1 },
  //   { text: "Room 2", id: 2 },
  // ];

  // const [data, setData] = useState(appointments);
  const [data, setData] = useState();
  const [resources, setResources] = useState();
  const [grouping] = useState([
    {
      resourceName: "members",
    },
  ]);

  let commitChanges = null;

  useEffect(() => {
    if (appoints && users) {
      console.log(appoints);
      setData(appoints);
      setResources([
        {
          fieldName: "members",
          title: "Members",
          instances: users,
          allowMultiple: true,
        },
      ]);

      commitChanges = ({ added, changed, deleted }) => {
        let newData = data.slice();
        if (added) {
          const startingAddedId =
            newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
          newData = [...newData, { id: startingAddedId, ...added }];
        }
        if (changed) {
          newData = newData.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          );
        }
        if (deleted !== undefined) {
          newData = newData.filter((appointment) => appointment.id !== deleted);
        }
        setData(newData);
      };
    }
  }, [appoints, users]);

  // const [resources] = useState([
  //   {
  //     fieldName: "members",
  //     title: "Members",
  //     instances: owners,
  //     allowMultiple: true,
  //   },
  //   // {
  //   //   fieldName: "roomId",
  //   //   title: "Location",
  //   //   instances: locations,
  //   // },
  // ]);

  return (
    data &&
    users && (
      <Paper>
        <Scheduler data={data}>
          <ViewState defaultCurrentDate="2017-05-28" />
          <EditingState onCommitChanges={commitChanges} />
          <GroupingState grouping={grouping} groupByDate={isGroupByDate} />

          <DayView startDayHour={9} endDayHour={17} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <Resources data={resources} mainResourceName="members" />

          <IntegratedGrouping />
          <IntegratedEditing />

          <AppointmentTooltip showOpenButton />
          <AppointmentForm />
          <GroupingPanel />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    )
  );
};

export default SchedulerBoard;
