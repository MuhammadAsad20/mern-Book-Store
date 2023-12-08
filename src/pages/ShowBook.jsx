import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          {renderDetail('Id:', book._id)}
          {renderDetail('Title:', book.title)}
          {renderDetail('Author:', book.author)}
          {renderDetail('Publish Year:', book.publishYear)}
          {renderDetail('Create Time:', new Date(book.createdAt).toString())}
          {renderDetail('Last Update Time:', new Date(book.updatedAt).toString())}
        </div>
      )}
    </div>
  );
};

const renderDetail = (label, value) => (
  <div className='my-4'>
    <span className='text-xl mr-4 text-gray-500'>{label}</span>
    <span>{value}</span>
  </div>
);

export default ShowBook;