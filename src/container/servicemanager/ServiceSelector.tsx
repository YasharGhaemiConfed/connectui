import React from "react";
import {
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";

interface ManualServiceProps {
  setService: (services: number[][]) => void;
  tasks: string[];
  services: number[][] | undefined;
}

const ManualService: React.FC<ManualServiceProps> = ({
  tasks,
  services,
  setService,
}) => {
  const [checked, setChecked] = React.useState<number[]>([]);

  const handleAddService = () => {
    const newServices = services ? [...services] : [];
    newServices.push(checked);
    setService(newServices);
    setTimeout(() => setChecked([]), 10);
  };

  const clearServices = () => {setService([])};

  const handleToggle = (currentIndex: number) => () => {
    if (isDisabled(currentIndex)) return;
    var newChecked = [...checked];

    if (!newChecked.includes(currentIndex)) {
      newChecked.push(currentIndex);
    } else {
      newChecked = newChecked.filter((c) => c !== currentIndex);
    }

    setChecked(newChecked);
  };

  const isDisabled = (currentIndex: number) => {
    return services ? services.flat().includes(currentIndex) : false;
  };

  return (
    <Grid item xs={8} md={6}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            فهرست عملیات
          </ListSubheader>
        }
      >
        {tasks.map((item, index) => {
          const labelId = `checkbox-list-label-${index}`;
          return (
            <ListItem key={item} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(index)}
                dense
              >
                <Checkbox
                  edge="start"
                  checked={checked.includes(index)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  disabled={isDisabled(index)}
                />

                <ListItemText id={labelId} primary={item} />
              </ListItemButton>
            </ListItem>
          );
        })}
        <Divider />
        <ListItemButton onClick={handleAddService}>
          <ListItemText primary="افزودن" sx={{ textAlign: "center" }} />
        </ListItemButton>
        <ListItemButton onClick={clearServices}>
          <ListItemText primary="حذف دستها" sx={{ textAlign: "center" }} />
        </ListItemButton>
      </List>
    </Grid>
  );
};

export default ManualService;
