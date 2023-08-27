import { Fragment } from "react";
import React from "react";
import {
  getAllEmployees,
  deleteEmployee,
  createEmployees,
  updateEmployee,
} from "../axios/axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { useUserId } from "./user-provider-id";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 350,
  borderRadius: 5,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Table = () => {
  const { userId } = useUserId();
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);

  const [newEmployeeName, setNewEmployeeNewName] = React.useState("");
  const [newEmployeeSalary, setNewEmployeeSalary] = React.useState("");
  const [EmployeeId, setEmployeeId] = React.useState("");
  const [updateSalary, setUpdateSalary] = React.useState("");
  const [updateName, setUpdateName] = React.useState("");
  const [employees, setEmployees] = useState([]);
  const [CreateModalopen, setCreateModalOpen] = React.useState(false);
  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    fetchEmployees();
  }, [userId]);

  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees(userId);

      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  const HandleDeleteEmployees = async (uId) => {
    const UserIdDelete = userId;
    try {
      await deleteEmployee(uId, UserIdDelete);
      fetchEmployees();
      console.log("Datos enviados correctamente");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const HandleUpdateEmployee = async (eId) => {
    const employeeData = {
      name: updateName,
      salary: updateSalary,
      id: eId,
      userId: userId,
    };

    try {
      await updateEmployee(employeeData);

      console.log("Datos enviados correctamente update");
      handleClose();
      fetchEmployees();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  const handleChangeName = (e) => {
    const value = e.target.value;
    setNewEmployeeNewName(value);
    console.log("ejecutada");
  };
  const handleChangeSalary = (e) => {
    const value = e.target.value;
    setNewEmployeeSalary(value);
  };

  const handleUpdateName = (e) => {
    const value = e.target.value;
    setUpdateName(value);
  };
  const handleUpdateSalary = (e) => {
    const value = e.target.value;
    setUpdateSalary(value);
  };

  const HandleCreateEmployees = async (nName, nSalary) => {
    const newEmployeeData = {
      userId: userId,
      name: nName,
      salary: nSalary,
    };
    
    try {
      const response = await createEmployees(newEmployeeData);
      setEmployeeId(response.id);
      console.log("Datos enviados correctamente");
      handleCreateModalClose();
      fetchEmployees();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="table-responsive">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Salario</th>
                <th scope="col">Crear Empleado</th>
                <th scope="col">Editar Empleado</th>
                <th scope="col">Eliminar Empleado</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {employees.map((employee, index) => (
                <tr className="align-middle" key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="align-middle">{employee.name}</td>
                  <td className="align-middle">$USD {employee.salary}</td>
                  <td className="align-middle">
                    <Button
                      onClick={handleCreateModalOpen}
                      type="button"
                      className="btn btn-success btn-sm"
                      color="success"
                      variant="contained"
                    >
                      Crear Empleado
                    </Button>

                    <Modal
                      open={CreateModalopen}
                      onClose={handleCreateModalClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <TextField
                          sx={{ margin: 2 }}
                          id={`Name-Employee-${index}`}
                          label="Nombre Empleado"
                          variant="standard"
                          onChange={handleChangeName}
                        ></TextField>
                        <TextField
                          sx={{ margin: 2, marginBottom: 10 }}
                          id={`Salary-Employee-${index}`}
                          label="Salario Empleado"
                          variant="standard"
                          onChange={handleChangeSalary}
                        ></TextField>
                        <Box>
                          
                          <Button
                            sx={{ marginTop: 4, margin: 2 }}
                            onClick={() =>
                              HandleCreateEmployees(
                                newEmployeeName,
                                newEmployeeSalary
                              )
                            }
                            color="success"
                            size="small"
                            variant="contained"
                          >
                            Aceptar
                          </Button>
                          <Button
                            onClick={handleCreateModalClose}
                            color="error"
                            size="small"
                            variant="contained"
                          >
                            Cancelar
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  </td>
                  <td>
                    <IconButton
                      onClick={() => handleOpen(employee)}
                      type="button"
                      className="btn btn-secondary btn-sm"
                    >
                      <EditIcon fontSize="large" color="primary"></EditIcon>
                    </IconButton>
                    {selectedEmployee && (
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <TextField
                            sx={{ margin: 2 }}
                            placeholder={selectedEmployee.name}
                            id={`New-Name-Employee-${index}`}
                            label="Editar Nombre Empleado"
                            variant="standard"
                            onChange={handleUpdateName}
                          ></TextField>
                          <TextField
                            sx={{ margin: 2, marginBottom: 10 }}
                            placeholder={selectedEmployee.salary}
                            id={`New-Salary-Employee-${index}`}
                            label="Editar Salario Empleado"
                            variant="standard"
                            onChange={handleUpdateSalary}
                          ></TextField>
                          <Box>
                            {" "}
                            <Button
                              sx={{ marginTop: 4, margin: 2 }}
                              onClick={() =>
                                HandleUpdateEmployee(
                                  selectedEmployee.id,
                                  selectedEmployee.name,
                                  selectedEmployee.salary
                                )
                              }
                              color="success"
                              size="small"
                              variant="contained"
                            >
                              Aceptar
                            </Button>
                            <Button
                              onClick={handleClose}
                              color="error"
                              size="small"
                              variant="contained"
                            >
                              Cancelar
                            </Button>
                          </Box>
                        </Box>
                      </Modal>
                    )}
                  </td>
                  <td>
                    <IconButton
                      onClick={() => HandleDeleteEmployees(employee.id)}
                      type="button"
                      className="btn btn-danger btn-sm"
                    >
                      <DeleteForeverIcon
                        sx={{ color: "#D90919" }}
                        fontSize="large"
                      />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default Table;
