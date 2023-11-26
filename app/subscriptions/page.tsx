'use client';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import s from '../../styles/subscriptions.module.scss';
import { Colors } from '@/variables/colors';
import { NoSubscriptions } from '@/components/modules/noSubscriptions/NoSubscriptions';
import {
  useGetSubscriptionsQuery,
  useManageCodeMutation,
} from '@/store/services';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { upgradeProduct } from '@/store/slice/productsSlice';
import { routes } from '@/variables/routes';
import { selectGetUser } from '@/store/slice/userSlice';
import Card from '@/components/modules/subscriptionsContent/UI/card/Card';
import Slider, { Settings } from 'react-slick';
import { ArrowRight } from '@/components/UI/icons/ArrowRight';
import { ArrowLeft } from '@/components/UI/icons/ArrowLeft';
import Accordion from '@/components/modules/subscriptionsContent/UI/accordion/Accordion';

export default function Subscriptions() {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector(selectGetUser);
  const {
    data: subscriptions,
    isLoading,
    refetch,
  } = useGetSubscriptionsQuery(null);
  const [manageCodes, { isLoading: manageLoading, error }] =
    useManageCodeMutation<any>();
  const [productId, setProductId] = useState(0);
  const [subscribeId, setSubscribeId] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [activeCodes, setActiveCodes] = useState(activeCard || -1);
  const [codesIds, setCodesIds] = useState<number[]>([]);
  const cardsNumber = subscriptions ? subscriptions.length : 0;
  const codesId: number[] = [];
  let slider: Slider | null;
  const router = useRouter();

  const settings: Settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    afterChange(currentSlide) {
      setActiveCard(currentSlide);
      setActiveCodes(-1);
      if (subscriptions) {
        setProductId(subscriptions[currentSlide].productId);
        setSubscribeId(subscriptions[currentSlide].codes[0].subscribeId);
      }
    },
    variableWidth: true,
    arrows: false,
  };

  if (!username) {
    router.push(routes.registration);
  }

  useEffect(() => {
    refetch();
    if (subscriptions?.length) {
      setProductId(subscriptions[0].productId);
      setSubscribeId(subscriptions[0].codes[0].subscribeId);
    }
  }, [subscriptions, isLoading]);

  const handleUpgradeProduct = () => {
    dispatch(upgradeProduct({ productId, subscribeId }));
    router.push(routes.chooseCard);
  };

  const handleSelectCodes = (codeId: number, checked: boolean) => {
    if (!checked) {
      setCodesIds((codesIds) => [...codesIds, codeId]);
    } else {
      setCodesIds((codesIds) => codesIds.filter((id) => id !== codeId));
    }
  };

  const handleConfirm = async () => {
    if (subscriptions?.length)
      await manageCodes({
        codesIds,
        subscribeId: subscriptions[activeCard].id,
      });
  };

  const pushCodes = () => {
    if (subscriptions?.length) {
      subscriptions[activeCard].codes.map((codeId) => codesId.push(codeId.id));
      codesId.sort((a, b) => a - b);
    }
  };

  pushCodes();

  return (
    <div className={s.subscriptions}>
      <div className={s.subscriptions__top}>
        <h1 className={s.subscriptions__text}>My subscriptions</h1>
        {cardsNumber && !isLoading && (
          <MyButton
            onClick={handleUpgradeProduct}
            className={`${Colors.primary} subscriptions`}>
            Upgrade
          </MyButton>
        )}
      </div>
      {!isLoading &&
        (subscriptions && subscriptions.length ? (
          <>
            <div className={s.slider__wrapper}>
              <Slider {...settings} ref={(s) => (slider = s)}>
                {subscriptions.map((subscription, index) => (
                  <Card
                    isDisabled={activeCard === index}
                    setActiveCard={() => setActiveCodes(index)}
                    key={subscription.id}
                    subscription={subscription}
                  />
                ))}
              </Slider>
              <div className={s.buttons}>
                <button
                  onClick={() => {
                    slider?.slickPrev();
                  }}
                  disabled={activeCard === 0}
                  className={s.prev}>
                  <ArrowLeft />
                </button>
                <div className={s.slide_numbers}>
                  <div className={s.slide_current}>{activeCard + 1}</div>/
                  {cardsNumber}
                </div>
                <button
                  onClick={() => {
                    slider?.slickNext();
                  }}
                  disabled={activeCard === cardsNumber - 1}
                  className={s.prev}>
                  <ArrowRight />
                </button>
              </div>
            </div>
            {activeCodes > -1 ? (
              <div className={s.codes}>
                {codesId.map((id, index) => {
                  const currentCode = subscriptions[activeCodes].codes.find(
                    (code) => code.id === id,
                  );
                  const isChecked = codesIds.some((codeId) => codeId === id);
                  const spareCode = subscriptions[activeCodes].codes[0];
                  return (
                    <div key={index} className={s.code}>
                      <Accordion
                        selectCodes={(checked: boolean) => {
                          handleSelectCodes(id, checked);
                        }}
                        checked={isChecked}
                        cardCode={currentCode || spareCode}
                      />
                    </div>
                  );
                })}
                <div className={s.select__domain}>
                  <p className={s.select__text}>
                    Select the domains you want to keep
                  </p>
                  <MyButton
                    onClick={handleConfirm}
                    className={`${Colors.primary} domain`}
                    disabled={
                      !!(
                        codesIds.length !==
                        subscriptions[activeCard]?.product.sitesCount
                      )
                    }
                    isLoading={manageLoading}>
                    Сonfirm
                  </MyButton>
                </div>
                {error && (
                  <span className="error_message">{error.data.message}</span>
                )}
              </div>
            ) : null}
          </>
        ) : (
          <NoSubscriptions />
        ))}
    </div>
  );
}
