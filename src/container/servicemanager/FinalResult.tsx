import React from 'react';
import { ResultResponse } from './models';
import { Grid, Paper, Stack } from '@mui/material';

interface FinalResultProps{
    response:ResultResponse;
    tasks:string[];
}

const FinalResult:React.FC<FinalResultProps> = ({response,tasks}) => {
    return (
        <Grid item xs={8} md={6} component={Paper}>
            <Stack >
            {`امتیاز: ${response.score}`}
            </Stack>
            <Stack>

            <ul>
                {response.set.map((e)=>(
                    <li>
                        {e.map((item) => `${tasks[item]}, `)}
                    </li>
                    ))}

            </ul>
            </Stack>
        </Grid>
    );
};


export default FinalResult;