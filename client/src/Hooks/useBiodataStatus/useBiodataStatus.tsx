// src/hooks/useBiodataStatus.ts
import { useEffect, useState } from 'react';
import {
  fetchBiodataCreated,
  fetchIdCardStatus,
} from '../../utils/apiUtils/apiUtils';

export const useBiodataStatus = () => {
  const [biodataCreated, setBiodataCreated] = useState(false);
  const [idStatus, setIdStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [biodata, idCard] = await Promise.all([
          fetchBiodataCreated(),
          fetchIdCardStatus(),
        ]);
        setBiodataCreated(biodata.success);
        setIdStatus(idCard.status);
      } catch (err) {
        setError('Failed to load biodata or ID status');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { biodataCreated, idStatus, loading, error };
};
