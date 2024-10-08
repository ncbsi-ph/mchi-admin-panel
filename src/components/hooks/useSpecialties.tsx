import { useQuery } from '@tanstack/react-query';
import { useUser } from '../../store/store';
import { getSpecialties } from '../../api';

const useSpecialties = () => {
  const { token } = useUser();
  return useQuery({
    queryKey: ['specialties'],
    queryFn: () => getSpecialties(token),
    select: (data) =>
      data.map((item) => ({
        value: item.specialty,
        label: item.specialty.toUpperCase(),
      })),
  });
};

export default useSpecialties;
