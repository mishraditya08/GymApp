import React,{useEffect, useState} from 'react'
import {Box, Stack, Typography, Button, TextField} from '@mui/material';
import { exerciseOptions, fetchData } from '../Utilities/fetchData';
import HorizontalScrollBar from './HorizontalScrollBar';


const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
    const[search,setSearch]= useState('')
    
    const [bodyParts, setBodyParts]=useState([])
    useEffect(()=>{
        const fetchExercisesData= async()=>{
            const bodyPartsData= await fetchData(
                'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
                exerciseOptions
            );
            setBodyParts(['all', ...bodyPartsData]);

        }
        fetchExercisesData();
    }, [])

    const handleSearch= async()=>{
        
        if(search){
            const exercisesData= await fetchData(
                'https://exercisedb.p.rapidapi.com/exercises',
                exerciseOptions,
            );
            console.log("asbdhjas",exercisesData);
            const searchedExercise = exercisesData.filter((exercise) => {
                const match = exercise.name.toLowerCase().includes(search) ||
                    exercise.target.toLowerCase().includes(search) ||
                    exercise.equipment.toLowerCase().includes(search) ||
                    exercise.bodyPart.toLowerCase().includes(search);
                
                if (match) {
                    console.log('Match found:', exercise);
                } else {
                    console.log('No match:', exercise);
                }
                return match;
            });
            
            console.log("Filtered Exercises:", searchedExercise);

            setSearch('');
            setExercises(searchedExercise);
        }
    }

  return (
    <Stack alignItems={'center'} mt="37px" 
    justifyContent={'center'} p="20px">
        <Typography fontWeight={700} sx={{
            fontSize:{lg:'44px', xs:'30px'}
        }} mb ="50px" textAlign={'center'}>
            Awesome Exercises you <br /> should know.
        </Typography>
        <Box>
            <TextField 
                sx={{
                    input:{
                        fontWeight:'700',
                        border: 'none',
                        borderRadius: '4px'
                    }, 
                    width: {lg: '800px', xs:'350px'},
                    backgroundColor:"#fff",
                    borderRadius: '40px'
                }}
                height="76px"
                value={search}
                onChange={(e)=> setSearch(e.target.value.toLowerCase())}
                placeholder='Search Exercises...'
                type='text'
            />
            <Button className='search-btn'
            sx={{
                bgcolor:"#ff2625",
                color: '#fff',
                textTransform: 'none',
                width:{lg:'175px', xs:'80px'},
                fontSize:{lg:'20px', xs:'14px'},
                height: '56px',
                position:"absolute",
                
                
            }} onClick= {handleSearch}
            >
                Search
            </Button>
        </Box>
        <Box sx={{position: 'relative', width:'100%', p:'20x'}}>
            <HorizontalScrollBar data={bodyParts} 
            bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts
            />
        </Box>
    </Stack>
  )
}

export default SearchExercises