import { screen, render, fireEvent } from '@testing-library/react';
import { SyntheticEvent } from 'react';
import '@testing-library/jest-dom';
import Card from './'

const handleCardActions = (e: SyntheticEvent, type: string) => {
    switch(type) {
      case 'create':
        console.log('成功開設新房間');
        break;
      case 'join':
        console.log('成功加入現有房間');
        break;
      default:
        console.log(`遊戲ID: ${type.split('-')[1]}`);
    }
  }

test('renders card component', () => {
    const card = {
        id: '123',
        cover: {
            src: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            alt: 'game cover',
        },
        title: 'game title',
        price: 100,
        rating: 4.5,
        tags: ['益智', '多人'],
    }

    render(<Card {...card} onClick={handleCardActions} />);

    // 測試卡片是否正常渲染
    const cardElement = document.querySelector('.card');
    expect(cardElement).toBeInTheDocument();

    // 測試cover是否在頁面上
    const cover = cardElement?.querySelector('.cover');
    expect(cover).toBeInTheDocument();
    
    // 測試title是否在頁面上並且比對資料
    const title = cardElement?.querySelector('.card-title');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe(card.title);
    
    // 測試price是否在頁面上並比對資料
    const price = cardElement?.querySelector('.price');
    expect(price).toBeInTheDocument();
    expect(price?.textContent).toMatch(/100/i);
    
    // 測試rating是否在頁面上並比對資料
    const rating = cardElement?.querySelector('.rating');
    expect(rating).toBeInTheDocument();
    expect(rating?.textContent?.trim()).toMatch(/4.5/i);
    
    // 測試actions是否在頁面上
    const actions = cardElement?.querySelector('.actions');
    expect(actions).toBeInTheDocument();

    // 測試actions是否包含三個按鈕
    const buttons = actions?.querySelectorAll('button');
    expect(buttons?.length).toBe(3);

    // 測試開設新房間是否正常顯示
    const createButton = buttons?.item(0);
    expect(createButton).toBeVisible();
    expect(createButton?.textContent).toBe('開設新房間');
    // 檢查按鈕的onClick事件，並回傳訊息
    if (createButton) fireEvent.click(createButton)

    // 測試加入現有房間是否正常顯示
    const joinButton = buttons?.item(1);
    expect(joinButton).toBeVisible();
    expect(joinButton?.textContent).toBe('加入現有房間');
    // 檢查按鈕的onClick事件，並回傳訊息
    if (joinButton) fireEvent.click(joinButton)

    // 測試遊戲詳情是否正常顯示
    const detailButton = buttons?.item(2);
    expect(detailButton).toBeVisible();
    expect(detailButton?.textContent).toBe('遊戲詳情');
    // 檢查按鈕的onClick事件，並回傳訊息
    if (detailButton) fireEvent.click(detailButton)
})