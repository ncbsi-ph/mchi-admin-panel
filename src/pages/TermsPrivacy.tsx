import { useEffect } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import { getTermsPrivacy } from '../api';
import { Card, Skeleton, Tabs, TabsProps } from 'antd';
import TermsConditions from '../components/termsPrivacy/TermsConditions';
import PrivacyPolicy from '../components/termsPrivacy/PrivacyPolicy';

const TermsPrivacy = () => {
  const { setItems } = useBreadcrumbActions();
  const { token } = useUser();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Terms & Condition',
      },
    ]);
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ['terms-privacy'],
    queryFn: () => getTermsPrivacy(token),
    enabled: !!token,
  });

  if (isLoading) return <Skeleton active />;

  if (error) return <p>{` "An error has occurred: " ${error}`}</p>;

  const items: TabsProps['items'] = [
    {
      key: '0',
      label: `Terms and Conditions`,
      children: (
        <TermsConditions data={data ? data.terms_and_conditions : ''} />
      ),
    },
    {
      key: '1',
      label: `Privacy Policy`,
      children: <PrivacyPolicy data={data ? data.privacy_policy : ''} />,
    },
  ];
  return (
    <Card>
      <Tabs defaultActiveKey="0" items={items} type="card" />
    </Card>
  );
};

export default TermsPrivacy;
