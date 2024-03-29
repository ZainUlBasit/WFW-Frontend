<InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <PersonIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledSelect
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  >
                    <option value="none">
                      {title == "Customer Payment"
                        ? "Select Customer"
                        : "Select Company"}
                    </option>
                    {data.map((cust, i) => (
                      <option key={i} value={cust._id}>
                        {cust.name}
                      </option>
                    ))}
                  </StyledSelect>
                  {/* <StyledInput
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter Name..."
                  /> */}
                </div>
              </InputWrapper>
              {/* Company cash Payment or customer cash Payment */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <AddCardIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="depositor"
                    type="number"
                    name="depositor"
                    placeholder="Enter Despositor Name..."
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                  />
                </div>
              </InputWrapper>
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <AddCardIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="paymentCash"
                    type="number"
                    name="paymentCash"
                    placeholder="Enter Payment..."
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* Company account number or customer account number */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <AccountBalanceIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="name"
                    type="number"
                    name="name"
                    placeholder="Enter Account #..."
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                  />
                </div>
              </InputWrapper>
              {/* payment date */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <CalendarMonthIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="date"
                    type="date"
                    name="date"
                    value={Cdate}
                    onChange={setCdate}
                  />
                </div>
              </InputWrapper>
              {/* Company or Customer Description */}
              <InputWrapper>
                <div className="bg-[#5A4AE3] flex py-[3px] rounded-[5px]">
                  <StyledLabel>
                    <DescriptionIcon className="LabelIcon" />
                  </StyledLabel>
                  <StyledInput
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter Description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </InputWrapper>