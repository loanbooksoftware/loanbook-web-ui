# sample code

## Mobile friendly list

```
<CardList
        rowClick={(id, path, record) => {
          const linkToLoan = linkToRecord(
            `/${Resources.shortTermLoans}`,
            record?.id,
            "show"
          );
          history.push(linkToLoan);
        }}
        title={
          <RaBox display="inline-flex">
            <DateField source="date" variant="h6" />
            <Divider orientation="vertical" flexItem variant="middle" />
          </RaBox>
        }
        subHeader={<RaBox display="inline-flex" ml={1}></RaBox>}
      >
        <RaGrid container spacing={1}>
          <RaGrid item xs={6} sm={6}>
            <Label label="Total">
              <TextField source="total" />
            </Label>
          </RaGrid>
        </RaGrid>
      </CardList>
```
