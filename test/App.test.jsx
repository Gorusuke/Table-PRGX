import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { DataContext } from "../src/context/DataContext.jsx";
import App from '../src/App.jsx'

const customRender = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <DataContext.Provider value={providerProps}>{ui}</DataContext.Provider>,
    renderOptions,
  )
}

const initialProps = {
  loading: true,
  addNewData: false,
  showDataDetails: false
}

beforeEach(() => cleanup())

describe('<App />', () => {

  test('should render loading text if loading is true', () => {
    customRender(<App />, { providerProps: initialProps })
    expect(screen.getByText('....Loading')).toBeDefined()
    expect(screen.getByText('Data Table')).toBeDefined()
  })

  test('should render table if loading is false', () => {
    const providerProps = {
      ...initialProps,
      loading: false,
      data: [{
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }]
    }
    customRender(<App />, { providerProps })
    expect(screen.getByText('ID')).toBeDefined()
    expect(screen.getByText('Title')).toBeDefined()
    expect(screen.getByText('Description')).toBeDefined()
    expect(screen.getByText('Actions')).toBeDefined()
    expect(screen.getByText(/Add New Row/i)).toBeDefined()
    expect(screen.getByText(/sunt aut/i)).toBeDefined()
    expect(screen.getByText(/recusandae/i)).toBeDefined()
  })

  test('should call setAddNewData when we click in /Add New Row/ button', () => {
    const providerProps = {
      ...initialProps,
      loading: false,
      setAddNewData: vi.fn(),
      data: [{
        userId: 2,
        id: 2,
        title: "This is a testing",
        body: "This is a test to know if everything is working"
      }]
    }
    customRender(<App />, { providerProps })
    const button = screen.getByText(/Add New Row/i)
    fireEvent.click(button)
    expect(providerProps.setAddNewData).toBeCalledTimes(1)
  })

  test('should render RowDetails component if showDataDetails is true', () => {
    const providerProps = {
      showDataDetails: true,
      rowDetails: {
        userId: 2,
        id: 2,
        title: "This is a testing",
        body: "This is a test to know if everything is working"
      }
    }
    
    customRender(<App />, { providerProps })
    const titleText  = screen.getByText('This is a testing')
    expect(titleText).toBeDefined()
  })


  test('should render AddNewData component if showDataDetails is false and addNewData true', () => {
    const providerProps = {
      showDataDetails: false,
      addNewData: true,
      setAddNewData: vi.fn(),
      editData: {
        title: '',
        description: ''
      },
      setEditData: vi.fn(),
      setDataFromLocalStorage: vi.fn(),
      data: []
    }
    
    customRender(<App />, { providerProps })

    const cancelarButton  = screen.getByText('Cancel')
    const sendButton  = screen.getByText('Send')
    expect(cancelarButton).toBeDefined()
    expect(sendButton).toBeDefined()
  })
})
