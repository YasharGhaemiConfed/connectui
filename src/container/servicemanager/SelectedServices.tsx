import React from "react";
import { Button, Grid } from "@mui/material";

interface SelectedServicesProps {
  tasks: string[] | undefined;
  services: number[][] | undefined;
  handleGenerate:()=>void;
}

const SelectedServices: React.FC<SelectedServicesProps> = ({
  tasks,
  services,
  handleGenerate
}) => {
  console.log(
    tasks?.filter((value, index) => {
      return services !== undefined ? !services.flat().includes(index) : true;
    })
  );

  return (
    <Grid item xs={8} md={6}>
      {tasks && (
        <ul>
          {tasks
            ?.filter((value, index) => {
              return services !== undefined
                ? !services.flat().includes(index)
                : true;
            })
            .map((item, index) => (
              <li key={index}>{item}</li>
            ))}

          {services &&
            services.map((serviceitem, index) => (
              <li key={`ks-${index}`}>
                {serviceitem.map((item) => `${tasks[item]}, `)}
              </li>
            ))}
        </ul>
      )}
      <Button fullWidth variant="contained" onClick={handleGenerate} >محاسبه</Button>
    </Grid>
  );
};

export default SelectedServices;
