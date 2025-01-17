import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import {exerciseOptions, fetchData, youtubeOptions} from '../Utilities/fetchData'
import Details from '../Components/Details'
import ExerciseVideos from '../Components/ExerciseVideos'
import SimilarExercises from '../Components/SimilarExercises'

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail]= useState({});
  const [exerciseVideos, setExerciseVideos] =useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] =useState([]);
  const [equipmentExercises, setEquipmentExercises] =useState([]);

  const {id} = useParams();
  useEffect(()=>{
    const fetchExercisesData= async()=>{
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
      const exerciseDetatilData = await fetchData (`${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions);
      setExerciseDetail(exerciseDetatilData);

      const exerciseVideosData= await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetatilData.name}`, youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData= await fetchData (`${exerciseDbUrl}/exercises/target/${exerciseDetatilData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);
      
      const equipmentExercisesData= await fetchData (`${exerciseDbUrl}/exercises/equipment/${exerciseDetatilData.equipment}`, exerciseOptions);
      setEquipmentExercises(equipmentExercisesData);
    }

    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Details exerciseDetail={exerciseDetail}/>

      <ExerciseVideos exerciseVideos={exerciseVideos} 
      name={exerciseDetail.name} />
      
      <SimilarExercises 
      targetMuscleExercises={targetMuscleExercises} 
      equipmentExercises={equipmentExercises} />
    </Box>
  )
}

export default ExerciseDetail