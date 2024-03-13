import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import FileUpload from "./FileUpload";
import ManualService from "./ServiceSelector";
import SelectedServices from "./SelectedServices";
import { GenerateResultAction } from "./services";
import { ResultResponse } from "./models";
import FinalResult from "./FinalResult";

const Dashboard = () => {
  const [tasks, setTasks] = useState<string[] | undefined>([]);
  const [services, setServices] = React.useState<number[][] | undefined>([]);
  const [response, setResponse] = React.useState<ResultResponse | undefined>(
    undefined
  );

  const handleSetTask = (tasks: string[]) => {
    setTasks(tasks);
  };

  const handleSetService = (services: number[][]) => {
    setServices(services);
  };

  const handleClear = () => {
    setTasks(undefined);
    setServices([]);
    setResponse(undefined);
  };

  const handleGenerate = async () => {
    if (tasks && services) {
      let newElements: number[][] = tasks
        .map((fe, fi) => {
          if (!services.flat().includes(fi)) {
            return [fi];
          } else {
            return undefined;
          }
        })
        .filter((element) => element !== undefined) as number[][];
      const candid_service: number[][] = services.concat(newElements);

      const service_response = await GenerateResultAction(candid_service);
      if (service_response?.status === 200) {
        setResponse(service_response.data);
      }
    }
  };

  useEffect(() => {
    console.log(services);
  }, [services]);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        fontSize: "medium",
        textAlign: "right",
      }}
    >
      <FileUpload setTasks={handleSetTask} setClear={handleClear} />
      {tasks && tasks.length !== 0 && (
        <>
          <ManualService
            tasks={tasks}
            services={services}
            setService={handleSetService}
          />
          <Grid item xs={8} md={6} flexGrow="column">
            <SelectedServices
              tasks={tasks}
              services={services}
              handleGenerate={handleGenerate}
            />
            {response && <FinalResult response={response} tasks={tasks}/>}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
